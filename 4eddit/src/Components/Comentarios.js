import React, { useEffect, useReducer, useContext } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ComentAddIcon from '@material-ui/icons/AddComment';
import "../Pages/pages.css"
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import useForm from "../hooks/Formulario"
import IconUp from '../img/flechaGostei.png'
import IconDown from '../img/flechaOdiei.png'
import Avatar from '@material-ui/core/Avatar';
import { listaReducer, initialState } from "../reducers/ListaPosts";
import { votoComentario } from "../actions/ApiComent"
import { pegaComentarios } from "../actions/ApiComent"
import { adicionaComent } from "../actions/ApiComent"
import ListaPostsContext from '../contexts/ListaPostsContext';

const Comentarios = styled.section `
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(64, 82, 89, 0.3);
`
const IconeAvatar = styled(Avatar)`
    background-color: #feb059;
    margin-right: 3%;
    width: 10vw;
   height: 10vw;
    color: #415259;
`

const Carma = styled.p `
    color: ${props => {
        if (props.isCool === 0){
            return '#415259'
        }else if(props.isCool > 0){
            return '#0d9201'
        }else{
            return '#ff0000'
        }
    }};
    font-size: 1rem;
    margin: 0 5%;
`

const useStyles = makeStyles((theme) => ({
  inputComentario:{
    width: '99%',
    top: theme.spacing(1),
  },
  botaoComentario:{
    left: theme.spacing(25), 
    top: theme.spacing(1),
  }
}));

const SessaoComentarios = (props) =>{
  const classes = useStyles();
  const { form, onChange, resetForm } = useForm({
    comentario: '',
  });
  
  const dispatchContext = useContext(ListaPostsContext);
  const [state] = useReducer(listaReducer, initialState);

  useEffect(() => {
    pegaComentarios(props.postId, dispatchContext.dispatch)
  }, [])

  const submitForm = event => {
      event.preventDefault()
  }

  const criaComentario = () => {
    adicionaComent(form.comentario, props.postId, dispatchContext.dispatch)
    resetForm()
  }

  const mudaValorInput = event => {
    const { name, value } = event.target;
    onChange(name, value);
  };
  
  const formataData = (dataEstranha)=> {    
    let dataFormatadaComprida
    let dataFormatadaFinal
    dataFormatadaComprida = new Date(dataEstranha)
    let dia = (dataFormatadaComprida.getDate() < 10 ? "0" : "") + dataFormatadaComprida.getDate();
    let mes = (dataFormatadaComprida.getMonth() + 1 < 10 ? "0" : "") + (dataFormatadaComprida.getMonth() + 1);
    let ano = dataFormatadaComprida.getYear() - 100;
    const novaData = dia + "/" + mes + "/" + ano
    dataFormatadaFinal = novaData;
    return dataFormatadaFinal
  }
  const formataHora = (dataEstranha) => {
    let dataFormatadaComprida
    let horaFormatada
    dataFormatadaComprida = new Date(dataEstranha)
    let hr = (dataFormatadaComprida.getHours() < 10 ? "0" : "") + dataFormatadaComprida.getHours();
    let min = (dataFormatadaComprida.getMinutes() < 10 ? "0" : "") + dataFormatadaComprida.getMinutes();
    const novaHora = hr + ":" + min
    horaFormatada = novaHora;
    return(horaFormatada)
  }


  const listaComent = state.comentarios.map((coment) => {
    return <article className='coments' key={coment.id}>
        <IconeAvatar>{coment.username.toUpperCase().substr(0, 1)}</IconeAvatar>
        <section className='container-coment'>
            <section className='conteudo-coment'>
                <p className="username-coment"> <b>{coment.username}:</b></p>
                <p className='texto-coment'>"{coment.text}"</p>
            </section>
            
            <section className='data-coment'>
                <p>{formataData(coment.createdAt)} </p>
                <p>&nbsp; às {formataHora(coment.createdAt)}</p>
            </section>
            <section className='carma-coment'>
              <img src={IconUp} alt={'Gostei'} className='icones-carma-coment' onClick={() => votoComentario(coment.id, props.postId, 1)}/>
              <Carma isCool={coment.votesCount}>{coment.votesCount}</Carma>
              <img src={IconDown} alt={'Odiei'} className='icones-carma-coment' onClick={() => votoComentario(coment.id, props.postId, -1)}/>
            </section>
        </section>
    </article>
})

  return(
      <Comentarios>
          <form onSubmit={submitForm}>
              <TextField
                  className={classes.inputComentario}
                  id="outlined-secondary"
                  label="Insira um comentário"
                  variant="outlined"
                  color="secondary"
                  multiline
                  required
                  size="small"
                  name='comentario'
                  value={form.comentario}
                  onChange={mudaValorInput}
                  inputProps={{ 
                    pattern: "{5,100}",
                    title: "O texto deve ter entre 5 e 100 caracteres" }}
              />
              <Button 
                color="primary"
                className={classes.botaoComentario}
                onClick={criaComentario}>
                Enviar
                <ComentAddIcon />
              </Button>
          </form>
          
          {listaComent}
      </Comentarios>
  );
}

export default SessaoComentarios
