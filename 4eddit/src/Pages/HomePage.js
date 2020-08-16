import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider } from "@material-ui/core";
import theme from "../theme.js";
import Logo from "../img/labeddit2.png"
import "./pages.css"
import SairIcon from '@material-ui/icons/ExitToApp';
import useForm from "../hooks/Formulario"
import PostAddIcon from '@material-ui/icons/PostAdd';
import Posts from '../Components/Posts'
import ListaPostsContext from '../contexts/ListaPostsContext';
import { createPost } from "../actions/ApiPosts"


const IconeSair = styled(SairIcon)`
  color: #feb059;
  && {
    :hover {
        color: #ff782e;
    }
  }
`
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  inputPostagem:{
    width: '99%',
    top: theme.spacing(1),
    bottom: theme.spacing(0),
  },
  inputTitulo: {
    width: '99%',
  },
  botaoPostagem:{
    left: theme.spacing(25), 
    top: theme.spacing(1),
  }
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };


  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

const HomePage = (props) => {
  const postsContext = useContext(ListaPostsContext);
  const history = useHistory();
  const classes = useStyles();
  const [posts, setPosts] =useState([])
  const { form, onChange, resetForm } = useForm({
    mensagem: '',
    titulo: '',
  });

    
  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (token === null){
      history.push("/")
    }
  }, [props.baseUrl])

  useEffect(() => {
      const listaPosts = postsContext.posts.map((post) => {
    return <Posts detalhePost={post}/>
  })
    setPosts(listaPosts)
    }
  , [postsContext.posts])

  const submitForm = event => {
    event.preventDefault()
  }

  const criarPost = () => {
    createPost(form.titulo, form.mensagem, postsContext.dispatch)
    resetForm()
  }

  const mudaValorInput = event => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  const goToLoginPage = () => {
    localStorage.clear();
    history.push("/");
  };
  
 
  return (
    <MuiThemeProvider theme={theme}>
        <div className='tela-feed'>
          <AppBar id="cabecalho" color="secondary">
            <img id='logo-pequeno' src={Logo} alt={'logo'} />
            <IconeSair fontSize={'large'} onClick={goToLoginPage} />
          </AppBar>
          <Toolbar id="back-to-top-anchor" />
          <Container>
            <Box my={2} id="conteudo-principal">
              <section id="adiciona-post">
                <p id='titulo-novo-post'>Compartilhe Algo</p>
                <form onSubmit={submitForm}>
                  <TextField
                    className={classes.inputTitulo}
                    id="input-titulo"
                    label="Título"
                    variant="outlined"
                    color="secondary"
                    required
                    size="small"
                    name='titulo'
                    value={form.titulo}
                    onChange={mudaValorInput}
                    inputProps={{ 
                      pattern: "{5,30}",
                      title: "O título deve ter entre 5 e 30 caracteres" }}
                  />
                  <TextField
                    className={classes.inputPostagem}
                    id="input-mensagem"
                    label="Mensagem"
                    variant="outlined"
                    color="secondary"
                    multiline
                    required
                    size="small"
                    name='mensagem'
                    value={form.mensagem}
                    onChange={mudaValorInput}
                    inputProps={{ 
                      pattern: "{5,300}",
                      title: "O texto deve ter entre 5 e 300 caracteres" }}
                  />
                  <Button 
                    color="primary"
                    className={classes.botaoPostagem}
                    onClick={criarPost}>
                    Enviar
                    <PostAddIcon />
                  </Button> 
                </form>
              </section>
                
                    <section className='tela-feed'>{posts}</section>
  
            </Box>
          </Container>
          <ScrollTop {...props}>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </div>
    </MuiThemeProvider>
  );
};

export default HomePage;