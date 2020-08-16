import axios from "axios";

const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit';
const token = window.localStorage.getItem("token")

const buscaComentarios = (comentarios) => ({
  type: "PEGA_COMENTARIOS",
  comentarios
});

export const pegaComentarios = async (id, dispatch) => {
  const token = window.localStorage.getItem("token")
    try {
    const response = await axios.get(
      `${baseUrl}/posts/${id}`,{
        headers: {
           Authorization: token
        },
      }
    );
    dispatch(buscaComentarios(response.data.post.comments));
  } catch (err) {
    console.log(err);
  }
};

export const adicionaComent = async (text, id, dispatch) => {
    const body = { text };
    if(body.text === ''){
      alert('Digite uma Comentário');
    }else {
      try {
        const response = await axios.post(`${baseUrl}/posts/${id}/comment`, body, {
          headers: {
            Authorization: token
          }
        });
          pegaComentarios(id, dispatch);
        } catch (err) {
            console.log(err);
        }
    }
};

export const votoComentario = async (idComent, idPost, direction, dispatch) => {
  const body = {direction};
    try {
    const response = await axios.put(`${baseUrl}/posts/${idPost}/comment/${idComent}/vote`, body, {
        headers: {
            Authorization: token
        }
    });
    pegaComentarios(idPost, dispatch);
  } catch (err) {
    console.log(err);
  }
};
