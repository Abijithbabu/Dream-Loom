import React from 'react';
import { Button, Typography, Container, styled } from '@mui/material';


const useStyles = styled((theme) => ({
  header: {
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '34px',
    marginTop: '12vh',
  },
  footer: {
    textAlign: 'center',
    fontFamily: 'Lato, sans-serif',
    fontWeight: 300,
    fontSize: '20px',
    marginTop: '15vh',
  },
  buttonContainer: {
    position: 'relative',
    width: '100px',
    height: '50px',
    margin: 'auto',
    overflow: 'hidden',
    border: '1px solid',
    fontFamily: 'Lato, sans-serif',
    fontWeight: 300,
    fontSize: '20px',
    transition: '0.5s',
    letterSpacing: '1px',
    borderRadius: '8px',
  },
  button: {
    width: '100%',
    height: '100%',
    fontFamily: 'Lato, sans-serif',
    // fontWeight: 300,
    fontSize: '11px',
    letterSpacing: '1px',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      animation: '$ani 0.7s steps(22) forwards',
    },
  },
  mas: {
    position: 'absolute',
    color: '#000',
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Lato, sans-serif',
    // fontWeight: 300, 
    fontSize: '11px',
    marginTop: '17px',
    overflow: 'hidden',
    fontWeight: 'bold',
  },
  '@keyframes ani': {
    from: {
      WebkitMaskPosition: '0 0',
      maskPosition: '0 0',
    },
    to: {
      WebkitMaskPosition: '100% 0',
      maskPosition: '100% 0',
    },
  },
}));

const MaterialUIButton = ({ buttonText, maskUrl, animationSteps }) => {
  const classes = useStyles();

  return (
    <div className={classes.buttonContainer}>
      <span className={classes.mas}>{buttonText}</span>
      <Button
        className={classes.button}
        style={{
          background: '#000',
          WebkitMask: `url(${maskUrl})`,
          mask: `url(${maskUrl})`,
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          border: 'none',
          color: '#fff',
        }}
      >
        {buttonText}
      </Button>
    </div>
  );
};

const App = () => {
  const classes = useStyles();

  return (
    <Container>
      <Typography className={classes.header}>
        CSS-MASK BUTTON HOVER ANIMATION (Experimental)
      </Typography>

      <MaterialUIButton
        buttonText="MASK1"
        maskUrl="https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/nature-sprite.png"
        animationSteps={22}
      />

      <MaterialUIButton
        buttonText="MASK2"
        maskUrl="https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/urban-sprite.png"
        animationSteps={29}
      />

      <MaterialUIButton
        buttonText="MASK3"
        maskUrl="https://raw.githubusercontent.com/pizza3/asset/master/natureSmaller.png"
        animationSteps={70}
      />

      <Typography className={classes.footer}>
        Inspired by{' '}
        <a href="https://tympanus.net/codrops/2016/09/29/transition-effect-with-css-masks/">
          this
        </a>{' '}
        codrops article
      </Typography>
    </Container>
  );
};

export default App;
