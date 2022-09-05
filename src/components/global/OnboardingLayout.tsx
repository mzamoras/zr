import React from "react";
import { useRouter } from 'next/router'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import theme from  '../../themes/default';
import StepIndicator from "./StepIndicatorProps";
import { useClient, useSteps } from "./useClient";
import { SelectChangeEvent } from '@mui/material/Select';
import { ButtonSection } from "./ButtonSection";
import { IconsSection } from "./IconsSection";
import { ControlsSection } from "./ControlsSectionProps";
import { Item } from "./Item";

type OnboardingLayoutProps = {
    children: React.ReactNode;
};

const OnboardingLayout = ({ children }: OnboardingLayoutProps) => {
    const router = useRouter();
    const { client: clientId } = router.query;
    const client = useClient(Number(clientId));
    const [currentStepIndex, currentStepObject, goNext, goPrev] = useSteps(client?.steps);

    return (!client ? <div>Loading...</div> : (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    Toolbar {client?.name}
                    <StepIndicator currentStep={currentStepIndex} totalSteps={client?.steps?.length || 0} />
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: 'calc(100vh - 94px)',
            }}>
                <Card sx={{ minHeight: '60vh' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Item>
                                <Typography variant="h4" color="inherit" component="div" align="center">
                                    {currentStepObject?.title || currentStepObject?.name}
                                </Typography>
                                <Typography variant="subtitle1" color="inherit" component="div" align="center">
                                    {currentStepObject?.subtitle}
                                </Typography>
                            </Item>
                        </Grid>
                        <IconsSection icons={currentStepObject?.icons} />
                        <ControlsSection controls={currentStepObject?.controls} />
                        <ButtonSection onNext={goNext} onPrev={goPrev} buttons={currentStepObject?.buttons} />
                    </Grid>
                    {children}
                </Card>
            </Container>
        </ThemeProvider>
    ));
}

export default OnboardingLayout;