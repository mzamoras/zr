import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import { useClient, useSteps, useClientThemeAndSettings } from "../../src/components/global/useClient";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import StepIndicator from "../../src/components/global/StepIndicator";
import { ButtonSection } from "../../src/components/global/ButtonSection";
import IconsSection from "../../src/components/global/IconsSection";
import { ControlsSection } from "../../src/components/global/ControlsSection";
import StepTitle from "../../src/components/onboarding/StepTitle";         
import { ThemeProvider } from '@mui/material/styles';


const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 'calc(100vh - 94px)',
}

const Stepper = ({ customers = [] }) => {
    const router = useRouter();
    const { client: clientId } = router.query;
    const client = useClient(Number(clientId));
    const [currentStepIndex, currentStepObject, goNext, goPrev] = useSteps(client?.steps);
    const totalSteps = client?.steps?.length || 0;
    const [canGoNext, setCanGoNext] = React.useState(false);
    const [onboardingForm, setOnboardingForm] = React.useState({});
    const [clientTheme, clientStyles] = useClientThemeAndSettings(client);

    const onNext = (e: React.SyntheticEvent) => {
        setCanGoNext(true);
        goNext(e);
    }
    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>, isValid?: boolean) => {
        const { name, value } = e.target;
        setOnboardingForm({ ...onboardingForm, [name]: value });
        setCanGoNext(isValid || false);
    }

    useEffect(() => {
        setCanGoNext(!(currentStepObject && currentStepObject.controls?.length && currentStepIndex));
    }, [currentStepObject, currentStepIndex]);

    return (
        <ThemeProvider theme={clientTheme}>
            <React.Fragment>
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        <StepIndicator currentStep={currentStepIndex} totalSteps={totalSteps} clientName={client?.name} clientSettings={clientStyles}/>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg" sx={containerStyle}>
                    <Card sx={{ minHeight: '60vh', ...(client?.theme?.borderRadius && {borderRadius: client?.theme?.borderRadius}) }} elevation={0}>
                        <Grid container spacing={2} height="100%">
                            <StepTitle stepInfo={currentStepObject} clientSettings={clientStyles} />
                            <IconsSection icons={currentStepObject?.icons} />
                            <ControlsSection controls={currentStepObject?.controls} onChange={onFormChange}/>
                            <ButtonSection onNext={onNext} onPrev={goPrev} buttons={currentStepObject?.buttons} canGoNext={canGoNext} clientSettings={clientStyles}/>
                        </Grid>
                    </Card>
                </Container>
            </React.Fragment>
        </ThemeProvider>
    );
};


export default Stepper;