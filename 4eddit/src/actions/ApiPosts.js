import axios from "axios";

const baseUrl= 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit';
const token = window.localStorage.getItem("token")

const buscaPosts = (posts) => ({
  type: "PEGA_POSTS",
  posts: posts
});

export const pegaPosts = async (dispatch) => {
  const token = window.localStorage.getItem("token")
    try {
    const response = await axios.get(
      `${baseUrl}/posts`,
      {
        headers: {
           Authorization: token
        },
      }
    );
    dispatch(buscaPosts(response.data.posts));
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (title, text, dispatch) => {
    const body = {
      text,
      title,
    };
    if (body.text === '') {
        alert('Digite uma Mensagem');
    } else if (body.title === '') {
        alert('Digite um Título');
    } else {
        try {
            const response = await axios.post(`${baseUrl}/posts`, body, {
                headers: {
                    Authorization: token
                }
            });
            console.log(response)
            pegaPosts(dispatch);
        } catch (err) {
            console.log(err);
        }
    }
};


export const votoPost = async (id, direction, dispatch) => {
  const body = {direction};
    try {
    const response = await axios.put(`${baseUrl}/posts/${id}/vote`, body, {
        headers: {
            Authorization: token
        }
    });
    pegaPosts(dispatch);
  } catch (err) {
    console.log(err);
  }
};
