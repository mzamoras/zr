import React from "react";
import { useRouter } from 'next/router'
import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Icon from '@mui/material/Icon';
import theme from  '../../themes/default';
import StepsContext from "../../globalContext";

const WrapperBoxStyling = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f5f5f5',
};

const paperStyling = {
    minWidth: '65vw',
    minHeight: '65vh',
};

const stepBoxStyling = {
    minWidth: '50px',
    margin: '5px 8px',
    height: '10px',
    backgroundColor: 'gray',
};


// const DynamicIcon =({name}) => {
//     const Selected = require(`@mui/icons-material/${name}`).default;
//     return (
//         <Selected />    
//     );
// }

const Layout = ({ children }) => {
    const stepsContext = React.useContext(StepsContext);
    const [currentClient, setCurrentClient ] = React.useState({});
    const [currentStep, setCurrentStep] = React.useState(0);
    const [customerSteps, setCustomerSteps] = React.useState([]);
    const [canGoNext, setCanGoNext] = React.useState(false);
    const router = useRouter();
    const { client } = router.query;

    const handleNext = (movement = 1) => {
        const nextStep = currentStep + movement;
        if (nextStep < customerSteps.length && nextStep >= 0) {
            setCurrentStep(nextStep);
            toggleCanGoNext();
            router.push(`steps/${customerSteps[nextStep].slug }`);
        }
    }

    const toggleCanGoNext = () => {
        setCanGoNext(!canGoNext);
    }

    const handleBack = () => {
        handleNext(-1);
    }

    React.useEffect(() => {
        if (client) {
            fetch(`http://localhost:3001/api/clients/${client}`).then(async (res) => {
                const responseClient = await res.json();
                setCurrentClient(responseClient)
                setCustomerSteps(responseClient?.steps || []);
            }).catch(err => {
                setCustomerSteps([]);
            });
        }
    } , [client]);
    
    return (
        <ThemeProvider theme={theme}>
            
            <AppBar position="static">
                <Toolbar>
                    <Box flexGrow={1} alignItems="center" justifyContent="center">
                        <Typography variant="body1" color="inherit" align="center">
                            Step {currentStep + 1} of {customerSteps?.length}
                        </Typography>
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            {customerSteps.map((customer, index) => {
                                return (
                                    <Box key={index} sx={{...stepBoxStyling, ...(index <= currentStep && { backgroundColor: 'blue' })}} />
                                )
                            })}
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box sx={WrapperBoxStyling}>
                <Paper sx={paperStyling}>
                    <Box>
                        <Typography variant="h6" color="inherit" component="div" align="center">
                            {customerSteps[currentStep]?.name}
                            {customerSteps[currentStep]?.icons.map(({icon, label}, index) => {
                                return (
                                    <div key={index}>
                                        <Icon >{icon}</Icon>
                                        <span>{label}</span>
                                    </div> 
                                )
                            } )}
                            <Icon>{customerSteps[currentStep]?.icons[0].icon}</Icon>
                        </Typography>
                        <Typography variant="h6" color="inherit" component="div" align="center">
                            {customerSteps[currentStep]?.subtitle}
                        </Typography>
                        <StepsContext.Provider value={{canGoNext, toggleCanGoNext}}>
                            {children}
                        </StepsContext.Provider>
                        <Button onClick={() => handleBack()} disabled={!currentStep}>
                            Previous
                        </Button>
                        <Button onClick={() => handleNext()} disabled={currentStep + 1 === customerSteps.length || !canGoNext}>
                            Next
                        </Button>
                        {JSON.stringify(canGoNext)}
                    </Box>

                </Paper>
            </Box>
        </ThemeProvider>
    );
}   

export default Layout;