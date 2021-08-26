## Comentários sobre o projeto

### Componente 'Comp'
Inicialmente é feito um Fetch na API, parseamos o resultado com o formato JSON e fazemos um Map do resultado, para economizar espaço em memória e facilitar a manipulação do array de objetos, mapeamos apenas as propriedades que usamos: Título, Labels, State (para retornar os abertos e fechados), comentários e data de criação (para retornar os mais atuais e mais antigos). E também retornamos o Index, para poder posteriormente saber se o index será ímpar ou par, para poder cumprir o requisito de fazer visualizações diferentes entre eles. E coloca isso no estado 'Data'.

Posteriormente, fazemos as funções para ordenar por mais antigos, mais novos e mais comentados. A função MapComments ordena as issues pela quantidade de comentários, e com isso, atualiza o estado 'Data'. As funções MapOlders e MapNews faz a mesma coisa, com base na data de criação, entre os mais antigos e mais novos.

O estado 'selected' armazena o valor escolhido no input entre 'mais novos', 'mais antigos' e 'mais comentados'. E quando clica no botão Ordenar, o mesmo valor passa para o estado Clicked, e no useEffect, o estado Data é atualizado com base no que é escolhido para o Clicked, e assim é feito o filtro de ordenação.

A mesma lógica é usada no "Status" e "StatusClicked". O que a pessoa seleciona no input passa para o estado Status, e quando clica no botão, passa para o StatusClicked, e esse clique dispara o useEffect que atualiza o Data com os elementos abertos ou fechados (no caso não tem nenhum fechado na API).

A lógica também é utilizada no status "Label" e "LabelClicked", sendo que a busca é feita pelo que o usuário pesquisa no Input, para retornar as labels digitadas. Lembrando que isso é case-sensitive, então o usuário deve digitar as letras da mesma forma que ele deseja o retorno, maiúsculas ou minúsculas.

Para realizar essa busca, é retornado o Labels, que é um array de objetos. Dentro dele, cada label é um objeto, e dentro desse objeto, tem a propriedade 'Name', que é a que buscamos retornar. Para retorná-los, fazemos um Filter, e comparamos os que incluem a propriedade 'Name' igual ao que o usuário digitou no input, ou seja, o estado Label. E com isso, no UseEffect, toda vez que o botão é clicado e o estado StatusClicked é atualizado, o Data recebe apenas as issues com as labels buscadas.

A paginação é feita fazendo um Slice no array do estado Data, retornando 10 issues por páginas. Dessa forma, é feito um if/else if no Return, se a página for 1, o Slice é feito entre as posições 1 e 10, se a página for 2, 10 e 20 e assim sucessivamente. As páginas são atualizadas com o clique nos radio buttons, que atualiza o estado 'Page'. E o estado Page baseia o if e else de acordo com a página que o usuário seleciona.

Com isso, é feita a passagem de props para o componente Issues, que renderiza os cards das issues na tela, retornando cada propriedade. É feito uma tradução, com o operador ternário da propriedade State, se for Open é renderizado como 'Aberto' e se não, é 'Fechado'. Nesse componente, também é feito um If/Else, baseado no index da postagem. Se for par, recebe a classe 'postsPar', e se for ímpar, recebe a 'postsImpar'. Cada classe recebe uma cor diferente no CSS, com isso cumprindo o requisito pedido de ter uma visualização diferente se for par ou ímpar.
