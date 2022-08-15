import { Box } from '@mui/material';

export const AndersonLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }} >
      <Box
        component='main'
        sx={{ flexGrow: 1 }}
      >
        {children}
      </Box>
    </Box>
  )
}