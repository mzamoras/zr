import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const Item = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default Item;
