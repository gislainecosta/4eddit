import React, { useState,  useContext } from "react";
import Avatar from '@material-ui/core/Avatar';
import IconESconde from '@material-ui/icons/ExpandLess';
import IconMostra from '@material-ui/icons/ExpandMore';
import { MuiThemeProvider } from "@material-ui/core";
import theme from "../theme.js";
import "../Pages/pages.css"
import styled from 'styled-components';
import IconUp from '../img/flechaGostei.png'
import IconDown from '../img/flechaOdiei.png'
import ShareIcon from '@material-ui/icons/Share';
import SessaoComentarios from './Comentarios';
import { votoPost } from "../actions/ApiPosts";
import ListaPostsContext from '../contexts/ListaPostsContext';

const IconeAvatar = styled(Avatar)`
    background-color: #ff782e;
    margin-right: 3%;
`
const IconeShare =styled(ShareIcon)`
    margin-right: 15vw;
    margin-left: 10vw;
`

const Carma =styled.p`
  color: ${props => {
      if (props.isCool === 0){
          return '#415259'
      }else if(props.isCool > 0){
          return '#0d9201'
      }else{
          return '#ff0000'
      }
  }};
  font-weight: bold;
  margin: 0 2%;
`

const Posts = (props) => {
  const [expanded, setExpanded] = useState(false);
  const postsContext = useContext(ListaPostsContext);
  const abreComentarios = () => {
    setExpanded(!expanded);
  };

  const formataData = (dataEstranha) => {
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
    return (horaFormatada)
  }

  return (
    <MuiThemeProvider theme={theme}>
        <article className='posts'>
          <section className='cabecalho-post'>
            <section className="identif-post">
            <IconeAvatar>{props.detalhePost.username === undefined ? "An" : props.detalhePost.username.toUpperCase().substr(0, 1)}</IconeAvatar>
              <p className="username">{props.detalhePost.username}</p>
            </section>
             <section className='data-post'>
                <p>{formataData(props.detalhePost.createdAt)} </p>
                <p>&nbsp; às {formataHora(props.detalhePost.createdAt)}</p>
              </section>
          </section>
          
          <section className='conteudo-post'>
              <p className='titulo-post'>{props.detalhePost.title} </p>
              <p className='texto-post'>"{props.detalhePost.text}"</p>
          </section>

          <section className='icones-posts'>
            <img src={IconUp} alt={'Gostei'} className='icones-carma' onClick={() => votoPost(props.detalhePost.id, 1, postsContext.dispatch)}/>
            <Carma isCool={props.detalhePost.votesCount}>{props.detalhePost.votesCount}</Carma>
            <img src={IconDown} alt={'Odiei'} className='icones-carma' onClick={() => votoPost(props.detalhePost.id, -1, postsContext.dispatch)}/>
            <IconeShare />
            <p classame='rodapé-post'>{props.detalhePost.commentsCount} {props.detalhePost.commentsCount === 1? 'Comentário' : 'Comentários'}</p>
            {expanded ? <IconESconde onClick={abreComentarios}/> : <IconMostra onClick={abreComentarios}/>}
          </section>

          {expanded && <SessaoComentarios postId={props.detalhePost.id}/>}
        </article>
    </MuiThemeProvider>
  );
};

export default Posts;