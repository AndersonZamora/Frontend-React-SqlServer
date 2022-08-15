import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import validator from 'validator';
import { Button, Grid, Link, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import { AuthLayout } from '../layout/AuthLayout';
import { useAuthStore, useFormLogin } from '../../hooks';


const loginFormFields = {
  loginEmail: '',
  loginPassword: ''
}

export const LoginPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmittedChecking, setFormSubmittedChecking] = useState(true);
  const { startLogin, errorMessage } = useAuthStore();

  const formValidations = {
    loginEmail: [(value) => validator.isEmail(value), 'Correo invalido'],
    loginPassword: [(value) => value.length >= 6, 'La contraseña debe tener más de 6 letras'],
  }
  const { loginEmail, loginPassword, onInputChange, loginEmailValid, loginPasswordValid } = useFormLogin(loginFormFields, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    startLogin({ email: loginEmail, password: loginPassword });
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autentificación', errorMessage, 'error');
    }

    if (formSubmitted) {
      if (!loginEmailValid && !loginPasswordValid) {
        setFormSubmittedChecking(true);
      } else {
        setFormSubmittedChecking(false);
      }
    }

  }, [errorMessage, loginEmailValid, loginPasswordValid, formSubmitted]);

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="text"
              name='loginEmail'
              placeholder='correo@google.com'
              fullWidth
              onChange={onInputChange}
              value={loginEmail}
              error={!!loginEmailValid && formSubmitted}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              name='loginPassword'
              placeholder='Contraseña'
              fullWidth
              onChange={onInputChange}
              value={loginPassword}
              error={!!loginPasswordValid && formSubmitted}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button
                type='submit'
                variant='contained'
                fullWidth
                disabled={!formSubmittedChecking}
              >
                Login
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>
      </form>

    </AuthLayout>
  )
}
