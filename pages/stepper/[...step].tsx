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
import { Breakpoint, ThemeProvider } from '@mui/material/styles';
import ClientContext from "../../src/globalContext";
import { customColoringBar } from "../api/mockDatabase/databaseHelpers";


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
    const clientCtx = {
        currentClient: client,
        currentStep: currentStepObject,
        currentStepIndex,
        clientSettings: client?.customerThemeSettings,
    }

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

    const { settings: cardSettings = {}, sx: cardSx = {} } = clientCtx.clientSettings?.card || {};
    const { settings: wrapperSettings = {}, sx: wrapperSx = {} } = clientCtx.clientSettings?.wrapper || {};
    const { settings: barSettings = {}, sx: barSx = {} } = clientCtx.clientSettings?.bar || {};
    const barColor = barSettings?.color || 'secondary';
    return (
        <ThemeProvider theme={clientTheme}>
            <ClientContext.Provider value={clientCtx}>
                <AppBar position="static" color={barColor as "inherit" | "primary" | "secondary" | "default" | "transparent" | undefined} sx={{...barSx || {}}} elevation={Number(barSettings.elevation || 0)}>
                    <Toolbar>
                        <StepIndicator currentStep={currentStepIndex} totalSteps={totalSteps} />
                    </Toolbar>
                </AppBar>
                <Container maxWidth={wrapperSettings.maxWidth as Breakpoint || 'lg'} sx={{...containerStyle, ...wrapperSx}}>
                    <Card sx={{ ...cardSx }} elevation={Number(cardSettings?.elevation || 0)}>
                        <Grid container spacing={2} height="100%">
                            <StepTitle stepInfo={currentStepObject} clientSettings={clientStyles} />
                            <IconsSection icons={currentStepObject?.icons} />
                            <ControlsSection controls={currentStepObject?.controls} onChange={onFormChange}/>
                            <ButtonSection onNext={onNext} onPrev={goPrev} canGoNext={canGoNext} />
                        </Grid>
                    </Card>
                </Container>
            </ClientContext.Provider>
        </ThemeProvider>
    );
};


export default Stepper;