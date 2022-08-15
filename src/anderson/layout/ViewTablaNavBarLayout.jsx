import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';

export const ViewTablaNavBarLayout = ({ children, title = '', view = true }) => {
    return (
        <Box sx={{ flexGrow: 1 }} >
            <Toolbar sx={{ backgroundColor: 'black' }}>
                {
                    (!view) && (
                        <IconButton
                            // onClick={handleView}
                            size="large"
                            edge="start"
                            aria-label="open drawer"
                            sx={{ mr: 2, color: '#13fa92' }}
                        >
                            <ReplyIcon />
                        </IconButton>
                    )
                }

                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', color: 'white' } }}
                >
                    {title}
                </Typography>
                {children}
            </Toolbar>
        </Box>
    )
}
