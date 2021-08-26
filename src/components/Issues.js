import React from 'react';
import '../App.css';

function Issues ({postagem}) {
  let title = postagem.title;
  let comments = postagem.comments;
  let state = postagem.state === "open" ? "Aberto" : "Fechado";
  let lab = postagem.labels.map((element) => element.name);
  let created = postagem.created_at;

  if (postagem.index % 2 === 0) {
    return (
      <div className='postsPar'>
        <h3 className='titulo'>{title}</h3>
        <p className='comentarios'><span className="subtitle"> Comentários: </span> {comments}</p>
        <p className='estado'><span className="subtitle">Estado: </span> {state}</p>
        <p className='label'><span className="subtitle">Labels: </span> {lab}</p>
        <p className="created"><span className="subtitle">Data de Criação: </span> {created}</p>
      </div>
    )
    } else {
      return (
        <div className='postsImpar'>
          <h3 className='titulo'>{title}</h3>
          <p className='comentarios'> <span className="subtitle"> Comentários: </span>{comments}</p>
          <p className='estado'><span className="subtitle"> Estado: </span>{state}</p>
          <p className='label'> <span className="subtitle">Labels: </span>{lab}</p>
          <p className="created"><span className="subtitle">Data de Criação:</span> {created}</p>
        </div>
      )
    }
}

export default Issues;