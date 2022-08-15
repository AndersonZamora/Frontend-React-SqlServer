import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import validator from 'validator';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useAuthStore, useFormLogin } from '../../hooks';
import Swal from 'sweetalert2';

const registerFormFields = {
  name: '',
  registerEmail: '',
  registerPassword: '',
}

export const RegisterPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmittedChecking, setFormSubmittedChecking] = useState(true);
  const { startRegiste, errorMessage } = useAuthStore();

  const formValidations = {
    name: [(value) => validator.isAlpha(value, 'es-ES', { ignore: ' ' }), 'Ingrese un nombre valido'],
    registerEmail: [(value) => validator.isEmail(value), 'Correo invalido'],
    registerPassword: [(value) => value.length >= 6, 'La contraseña debe tener más de 6 letras'],
  }

  const { registerEmail, registerPassword, name, onInputChange, registerEmailValid, registerPasswordValid, nameValid } = useFormLogin(registerFormFields, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    startRegiste({ email: registerEmail, password: registerPassword, name });
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en el registro', errorMessage, 'error');
    }

    if (formSubmitted) {
      if (!registerEmailValid && !registerPasswordValid && !nameValid) {
        setFormSubmittedChecking(true);
      } else {
        setFormSubmittedChecking(false);
      }
    }

  }, [errorMessage, registerEmailValid, registerPasswordValid, nameValid, formSubmitted]);


  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              name='name'
              placeholder='Nombre completo'
              fullWidth
              onChange={onInputChange}
              value={name}
              error={!!nameValid && formSubmitted}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="text"
              name='registerEmail'
              placeholder='correo@google.com'
              fullWidth
              onChange={onInputChange}
              value={registerEmail}
              error={!!registerEmailValid && formSubmitted}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              name='registerPassword'
              placeholder='Contraseña'
              fullWidth
              onChange={onInputChange}
              value={registerPassword}
              error={!!registerPasswordValid && formSubmitted}
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
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
              ingresar
            </Link>
          </Grid>

        </Grid>

      </form>
    </AuthLayout>
  )
}
