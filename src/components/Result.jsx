import { Box, Container, alpha } from '@mui/material'
import React from 'react'
import CircleProgressBar from './CircularProgressBar'

const Result = ({ score }) => {
    return (
        <Container>
            <Box
                id="image"
                sx={(theme) => ({
                    mt: { xs: 2, sm: 8 },
                    alignSelf: 'center',
                    minHeight: { xs: 500, sm: 700 },
                    width: '100%',
                    borderRadius: '10px',
                    outline: '1px solid',
                    outlineColor:
                        theme.palette.mode === 'light'
                            ? alpha('#BFCCD9', 0.5)
                            : alpha('#9CCCFC', 0.1),
                    boxShadow:
                        theme.palette.mode === 'light'
                            ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                            : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
                    backdropFilter: "grayscale(48px)",
                    backdropFilter: "blur(90px)",
                })}
            >
                Result : {score} / 10
                <CircleProgressBar percentage={score * 10} />
            </Box>
        </Container>
    )
}

export default Result