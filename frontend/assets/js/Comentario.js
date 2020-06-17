class Comentario {
  port = 3000;

  api = {
    url: `http://localhost:${this.port}/api/v1/comentarios`,
    inserir: '/insert',
    visualizar: '/view'
  };

  constructor() {
    let $ = document.querySelector.bind(document);
    this.divToAppend = $('#comentarios');
    this.textarea = $('#textarea');
    this.comentariosRequest();
  }

  comentariosRequest() {
    const url = this.api.url + this.api.visualizar;
    const options = {
      mode: "cors",
      method: "GET",
      headers: { "Content-type": "application/json" }
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => this.appendComentario(data));
  }

  appendComentario(comentariosArray) {
    comentariosArray.forEach(i => {
      this.divToAppend.appendChild(this.createCommentElement(i.comentario))
    });
  }

  createCommentElement(texto) {
    const divTag = document.createElement('div');
    const pTag = document.createElement('p');
    const buttonTag = document.createElement('button');

    divTag.className = 'comentarios__block';
    buttonTag.className = 'comentarios__block-button'

    const buttonText = document.createTextNode('Ouvir')
    buttonTag.appendChild(buttonText);
    buttonTag.addEventListener('click', () => this.ouvir(texto));

    const phrase = document.createTextNode(texto);
    pTag.appendChild(phrase);

    divTag.appendChild(pTag);
    divTag.appendChild(buttonTag);

    return divTag;
  }

  async cadastrar() {
    const comentario = { "comentario": this.textarea.value }

    const url = this.api.url + this.api.inserir;
    const options = {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(comentario)
    };

    const rawResponse = await fetch(url, options);
    const content = await rawResponse.json();

    this.appendComentario([comentario])
  }

  ouvir(texto) {
    console.log(texto);
  }
}

const comentario = new Comentario();
