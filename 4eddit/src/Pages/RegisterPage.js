import React from "react";
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import clsx from 'clsx';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconAdd from '@material-ui/icons/PersonAdd';
import { MuiThemeProvider } from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';
import theme from "../theme.js";
import Logo from "../img/labeddit.png"
import "./pages.css"
import IconMail from '@material-ui/icons/Mail';
import IconSenha from '@material-ui/icons/VpnKey';
import axios from "axios";
import useForm from "../hooks/Formulario"

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  textField: {
    width: '25ch',
  },
  botao: {
  margin: '3ch 0',
  }
}));

const RegisterPage = (props ) => {
  const classes = useStyles();
  const history = useHistory();
  
  const { form, onChange, resetForm } = useForm({
    user: '',
    senha: '',
    email: ''
  });

  const submitForm = event => {
    event.preventDefault()
  }
  
  const mudaValorInput = event => {
    const { name, value } = event.target;
    onChange(name, value);
  };
      
  const cadastro = async () => {
    const body ={      
      username: form.user,
      password: form.senha,
      email: form.email,
    }
    if(form.user === ""){
      alert('Digite um nome de usuário')
    }else if(form.email === ""){
      alert('Digite um e-mail')
    }else if(form.senha === ""){
      alert('Digite uma senha')
    }else{
      try{
        const response = await axios.post(`${props.baseUrl}/signup`, body);
          localStorage.setItem("token", response.data.token);
          history.push("/home");
      }catch (err) {
        resetForm()
        }
    }
  };

    return (
      <MuiThemeProvider theme={theme}>
          <div className='tela-toda'>
            <img id="logo-grande" src={Logo} alt={'Logo'} />
            <h1>Cadastre-se</h1>

            <form className="formulario" onSubmit={submitForm}>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                <InputLabel htmlFor="input-user">Usuário</InputLabel>
                <FilledInput
                  id="input-user"
                  type='text'
                  required
                  name='user'
                  value={form.user}
                  onChange={mudaValorInput}
                  inputProps={{ 
                    pattern: "[a-zA-Z]{3,}",
                    title: "O nome deve conter mais de 3 letras" }}
                  endAdornment={
                    <InputAdornment position="end">
                      <AccountCircle color="secondary"/>
                    </InputAdornment>
                  }
                />
              </FormControl>
              
              <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                <InputLabel htmlFor="input-email">E-mail</InputLabel>
                <FilledInput
                  id="input-email"
                  required
                  type='email'
                  name='email'
                  value={form.email}
                  onChange={mudaValorInput}
                  inputProps={{ 
                    pattern: "/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi",
                    title: "Insira um e-mail válido" }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconMail color="secondary"/>
                    </InputAdornment>
                  }
                />
              </FormControl>
  
              <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                <InputLabel htmlFor="input-senha">Senha</InputLabel>
                <FilledInput
                  id="input-senha"
                  type='text'
                  required
                  name='senha'
                  value={form.senha}
                  onChange={mudaValorInput}
                  inputProps={{ 
                    pattern: "[a-zA-Z0-9]{6,}",
                    title: "A senha deve conter no mínimo 6 caracteres entre números e letras" }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconSenha color="secondary"/>
                    </InputAdornment>
                  }
                />
              </FormControl>
              
              <Fab className={clsx(classes.margin, classes.botao)} onClick={cadastro} variant="extended" color="secondary" aria-label="add">
                Adicionar Cadastro &nbsp;
                <IconAdd className={classes.extendedIcon} />
              </Fab>
            </form>
          </div>
      </MuiThemeProvider>
    );
};

export default RegisterPage;