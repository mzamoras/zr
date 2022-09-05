import React from "react";
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import { Client } from "./api/mockDatabase/databaseHelpers";

const WrapperBoxStyling = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f5f5f5',
};

const Home: NextPage = () => {
    const [clients, setClients] = React.useState<Client[]>([]);
    const [currentClient, setCurrentClient] = React.useState<Client | null>(null);
    const router = useRouter();
    React.useEffect(() => {
        if (!clients.length) {
            fetch('http://localhost:3001/api/clients').then(async (res) => {
                const responseClient = await res.json();
                setClients(responseClient)
            }).catch(err => {
                setClients([]);
            });
        }
    } , [clients]);

    const onLinkClick = () => {
        if (currentClient) {
            router.push(`http://localhost:3001/stepper/steps/steps?client=${currentClient.id}`);
        }
    };

    const onChange = (e: SelectChangeEvent) => {
        const target = e.target as HTMLInputElement;
        if (clients.length) {
            const foundClient = clients.find(client => client?.id === Number(target.value));
            console.log(foundClient);
            if (foundClient) {
                setCurrentClient(foundClient);
            }
        }
    }
    
    return (
        <Box sx={WrapperBoxStyling}>
            <Grid container sx={{border: '1px dashed red'}}>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <ButtonGroup variant="text" aria-label="text button group">
                        <Button>Using Api</Button>
                        <Button>Using Json</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-helper-label">Customer</InputLabel>
                        <Select label="Choose the customer" onChange={onChange} defaultValue="">
                            {clients.map((customer, index) => {
                                return (
                                    <MenuItem key={index} value={Number(customer.id)}>{customer.name}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            {currentClient && (
                <Typography variant="body1" color="primary" align="center">
                    <Button onClick={onLinkClick}>
                        http://localhost:3001/onboarding/steps?client={currentClient.id}
                    </Button>
                </Typography>
            )}
        </Box>
    );
}

export default Home;