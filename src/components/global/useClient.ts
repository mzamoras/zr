import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { Client, OnboardingStep, ThemeSettings, ClientThemeSettings, IndividualSettings } from '../../../pages/api/mockDatabase/databaseHelpers';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import defaultTheme from '../../themes/default'; 

export function useClient(clientId : number | undefined) : Client | null {
    const [currentClient, setCurrentClient ] = useState<Client | null>(null);
    useEffect(() => {
        if (clientId) {
            fetch(`http://localhost:3001/api/clients/${clientId}`).then(async (res) => {
                const responseClient = await res.json();
                setCurrentClient(responseClient)
            }).catch(err => {
                setCurrentClient(null);
            });
        }
    } , [clientId]);
    return currentClient;
}

export function useSteps(clientSteps: OnboardingStep[] | undefined): [number, OnboardingStep | undefined, (e: React.SyntheticEvent) => void, (e: React.SyntheticEvent) => void] {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [isBottonNavigating, setIsBottomNavigating] = useState(false);
    const [currentSlug, setCurrentSlug] = useState(router.query.slug);

    const handleNext = (_event: React.SyntheticEvent, movement = 1) => {
        const nextStep = currentStep + movement;
        if (clientSteps && nextStep < clientSteps.length && nextStep >= 0) {
            setCurrentStep(nextStep);
            router.push(`steps/${clientSteps[nextStep].slug }?client=${router.query.client}`);
        }
    }
    const handleBack = (event: React.SyntheticEvent) => {
        handleNext(event, -1);
    }

    useEffect(() => {
        const qStep = router.query.step;
        const slug =  qStep?.[1] || null;

        if (slug && clientSteps && !isBottonNavigating) {
            const foundStep = clientSteps.findIndex(step => step.slug === slug);
            if (foundStep > -1) {
                setIsBottomNavigating(true);
                setCurrentStep(foundStep);
            }
        }
    },[router.query.step, clientSteps, currentSlug, isBottonNavigating]);

    return [currentStep, clientSteps?.[currentStep], handleNext, handleBack];
}

export function useOnboardingStepForm(clientSteps: OnboardingStep[] | undefined) {
    const [onboardingForm, setOnboardingForm] = useState<any>({});

}

export function useClientThemeAndSettings(client: Client | null): [ThemeOptions, ThemeSettings | undefined] {
    const [clientTheme, setClientTheme] = React.useState(defaultTheme);
    const [clientStyles, setClientStyles] = React.useState(client?.themeSettings);

    useEffect(() => {
        if (client?.theme) {
            const customTheme: ThemeOptions = {
                palette: {
                  mode: 'light',
                  primary: {
                    light: client?.theme?.light || '#5BE584',
                    main: client?.theme?.main || '#00AB55',
                    dark: client?.theme?.dark || '#007B55',
                  },
                  secondary: {
                    light: '#FFB74D',
                    main: client?.theme?.barColor || client?.theme?.main || '#00AB55',
                    dark: '#F57C00',
                  }
                },
              };
            setClientTheme(createTheme(customTheme));
        }
        if (client?.themeSettings) {
            setClientStyles(client.themeSettings);
        }
    }, [client]);
    return [clientTheme, clientStyles];
}

export function customStyling(style : { [key: string]: any }) : { [key: string]: any } | {} {
    return ( style && { ...style });
}


export function extractThemeSettings( themeSettings: IndividualSettings) : IndividualSettings {
    const { sx = {}, settings = {} } = themeSettings;
    return { sx, settings };
}

const exportables = {
    useClient,
    useSteps,
    useClientThemeAndSettings,
};
export default exportables;