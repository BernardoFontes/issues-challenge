import React, { useState, useEffect } from 'react';
import Issues from './Issues';
import '../App.css';

function Comp(){
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState('');
  const [clicked, setClicked] = useState('');
  const [status, setStatus] = useState('open');
  const [statusClicked, setStatusClicked] = useState('open');
  const [label, setLabel] = useState('');
  const [labelClicked, setLabelClicked] = useState('');
  const [page, setPage] = useState('1');

  function apiFetch() {
    const fetchApi = fetch("https://api.github.com/repos/facebook/react/issues")
      .then((response) => response.json())
        .then((result) => {
            const empty = [];
            result.map((elem, index) => {
              const elemLimpo = {
                title: elem.title ,
                labels: elem.labels,
                comments: elem.comments,
                state: elem.state,
                created_at: elem.created_at,
                index: index,
              }
              empty.push(elemLimpo);
            });
            return setData(empty)
          });
    return fetchApi;
  }

  function mapComments() {
    data.sort(function(a,b) {
      return b.comments > a.comments ? 1 : a.comments > b.comments ? -1 : 0;
  });
    setData([...data]);
  }

  function mapOlders() {
    data.sort(function(a,b) {
      return a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0;
  });
    setData([...data]);
  }

  function mapNews() {
    data.sort(function(a,b) {
      return b.created_at < a.created_at ? -1 : b.created_at > a.created_at ? 1 : 0;
  });
    setData([...data]);
  }

  function handleChange({ target }){
    const { value } = target;
    setSelected( value );
  }

  function statusChange({ target }){
    const { value } = target;
    setStatus( value );
  }

  function labelChange({ target }){
    const { value } = target;
    setLabel( value );
  }

  function statusClick(){
    setStatusClicked(status);
  }

  function handleClick(){
    setClicked(selected);
  }

  function labelClick(){
    setLabelClicked(label);
  }

  function pagesChange({ target }){
    const { value } = target;
    setPage(value);
    console.log(page);
  }

  useEffect(() => {
    apiFetch();
  },[]);

  useEffect(() => { 
    if (clicked === 'comentados'){
      console.log(data);
      mapComments();
    }
    if (clicked === 'antigos'){
      mapOlders();
    }
    if (clicked === 'recentes'){
      mapNews();
    }
  },[clicked])

  useEffect(() => {
    const map = [];
    data.forEach((element) => {
        const filtered = element.labels.filter((elem) => elem['name'].includes(label))
        if (filtered.length !== 0) {
          map.push(element);
        }
      });
    setData(map);
  }, [labelClicked])

    if (page === "1") {
      return(
        <div className="divInicial">
        <section className="cabecalho">
          <div className="radiobtns">
            <h3 className="h3Selec">Selecionar Página</h3>
            <input type="radio" value="1" data-testid="radioBut" className="radioBut" name="paginas" id="pag1" onChange={pagesChange} />1
            <input type="radio" value="2" data-testid="radioBut" className="radioBut" name="paginas" id="pag2" onChange={pagesChange} />2
            <input type="radio" value="3" data-testid="radioBut" className="radioBut" name="paginas" id="pag3" onChange={pagesChange} />3
          </div>
          <div className="divLabels">
            <h3 className="h3Divs">Labels</h3>
            <input data-testid="label-input"
              id="label-input"
              value={ label }
              onChange={ labelChange } />
            <button className="btns" name="pesquisar labels" onClick = {labelClick}>Pesquisar Labels</button>
          </div>
          <div className= "divStatus">
            <h3 className="h3Status">Status</h3>
            <select name="status"
              data-testid="status-input"
              id="status-input"
              value={ status }
              onChange={ statusChange }>
              <option data-testid="status-option" value="open">Abertos</option>
              <option data-testid="status-option" value="closed">Fechados</option>
            </select>
            <button className="btns" name="filtrar" onClick = {statusClick}>Filtrar</button>
          </div>
          <div className="divOrdenar">
            <h3 className="h3Ordenar">Ordenar por: </h3>
            <select name="selected"
              data-testid="selected-input"
              id="selected-input"
              value={ selected }
              onChange={ handleChange }>
              <option data-testid="order-option" value="comentados">Mais comentados</option>
              <option data-testid="order-option" value="recentes">Mais Recentes</option>
              <option data-testid="order-option" value="antigos">Mais Antigos</option>
            </select>
            <button className="btns" name="ordenar" onClick= {handleClick}>Ordenar</button>
          </div>
        </section>
      {
        data.slice(0,10).filter(
          (element) => element.state === statusClicked)
            .map((post, index) => (
            <Issues key={index} postagem={post} />
          ))
      }
  </div>
    )
    } else if (page === '2') {
      return(
        <div className="divInicial">
        <section className="cabecalho">
          <div className="radiobtns">
            <h3 className="h3Selec">Selecionar Página</h3>
            <input type="radio" value="1" data-testid="radioBut" className="radioBut" name="paginas" id="pag1" onChange={pagesChange} />1
            <input type="radio" value="2" data-testid="radioBut" className="radioBut" name="paginas" id="pag2" onChange={pagesChange} />2
            <input type="radio" value="3" data-testid="radioBut" className="radioBut" name="paginas" id="pag3"onChange={pagesChange} />3
          </div>
          <div className="divLabels">
            <h3 className="h3Divs">Labels</h3>
            <input data-testid="label-input"
              id="label-input"
              value={ label }
              onChange={ labelChange } />
            <button className="btns" name="pesquisar labels" onClick = {labelClick}>Pesquisar Labels</button>
          </div>
          <div className= "divStatus">
            <h3 className="h3Status">Status</h3>
            <select name="status"
              data-testid="status-input"
              id="status-input"
              value={ status }
              onChange={ statusChange }>
              <option data-testid="status-option" value="open">Abertos</option>
              <option data-testid="status-option" value="closed">Fechados</option>
            </select>
            <button className="btns" name="filtrar" onClick = {statusClick}>Filtrar</button>
          </div>
          <div className="divOrdenar">
            <h3 className="h3Ordenar">Ordenar por: </h3>
            <select name="selected"
              data-testid="selected-input"
              id="selected-input"
              value={ selected }
              onChange={ handleChange }>
              <option value="comentados">Mais comentados</option>
              <option value="recentes">Mais Recentes</option>
              <option value="antigos">Mais Antigos</option>
            </select>
            <button className="btns" name="ordenar" onClick= {handleClick}>Ordenar</button>
          </div>
        </section>
        {
          data.slice(10,20).filter(
            (element) => element.state === statusClicked)
              .map((post, index) => (
              <Issues className="par" key={index} postagem={post} />
            ))
        }
    </div>
      )
    } else if (page === '3'){
      return(
        <div className="divInicial">
        <section className="cabecalho">
          <div className="radiobtns">
            <h3 className="h3Selec">Selecionar Página</h3>
            <input type="radio" value="1" data-testid="radioBut" className="radioBut" name="paginas" id="pag1" onChange={pagesChange} />1
            <input type="radio" value="2" data-testid="radioBut" className="radioBut" name="paginas" id="pag2" onChange={pagesChange} />2
            <input type="radio" value="3" data-testid="radioBut" className="radioBut" name="paginas" id="pag3" onChange={pagesChange} />3
          </div>
          <div className="divLabels">
            <h3 className="h3Divs">Labels</h3>
            <input data-testid="label-input"
              id="label-input"
              value={ label }
              onChange={ labelChange } />
            <button className="btns" name="pesquisar labels" onClick = {labelClick}>Pesquisar Labels</button>
          </div>
          <div className= "divStatus">
            <h3 className="h3Status">Status</h3>
            <select name="status"
              data-testid="status-input"
              id="status-input"
              value={ status }
              onChange={ statusChange }>
              <option data-testid="status-option" value="open">Abertos</option>
              <option data-testid="status-option" value="closed">Fechados</option>
            </select>
            <button className="btns" name="filtrar" onClick = {statusClick}>Filtrar</button>
          </div>
          <div className="divOrdenar">
            <h3 className="h3Ordenar">Ordenar por: </h3>
            <select name="selected"
              data-testid="selected-input"
              id="selected-input"
              value={ selected }
              onChange={ handleChange }>
              <option value="comentados">Mais comentados</option>
              <option value="recentes">Mais Recentes</option>
              <option value="antigos">Mais Antigos</option>
            </select>
            <button className="btns" name="ordenar" onClick= {handleClick}>Ordenar</button>
          </div>
        </section>
        {
          data.slice(20,31).filter(
            (element) => element.state === statusClicked)
              .map((post, index) => (
              <Issues key={index} postagem={post} />
            ))
        }
    </div>
      )
    }
};

export default Comp;