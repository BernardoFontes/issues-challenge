import React from 'react';
import renderpag from '../services/renderpag';
import Comp from '../components/Comp';

test('testa os radio buttons de troca de página',
  () => {
    const { queryAllByTestId } = renderpag(<Comp />);
    const button = queryAllByTestId('radioBut');
    expect(button.length).toBe(3);
  });

test('testa o select de ordenação',
  () => {
    const { queryByTestId } = renderpag(<Comp />);
    const input = queryByTestId('selected-input');
    expect(input).toBeInTheDocument();
  });

  test('testa as opções de ordenação',
  () => {
    const { queryAllByTestId } = renderpag(<Comp />);
    const option = queryAllByTestId('order-option');
    expect(option.length).toBe(3);
  });

  test('testa as opções do filtro de estado aberto ou fechado',
  () => {
    const { queryAllByTestId } = renderpag(<Comp />);
    const option = queryAllByTestId('status-option');
    expect(option.length).toBe(2);
  });

test('testando botões de filtro, pesquisar e ordenar', () => {
  const { getByRole } = renderpag(<Comp />);
  const buttonFilter = getByRole('button', { name: /filtrar/i });
  const buttonSearch = getByRole('button', { name: /pesquisar labels/i });
  const buttonOrdenate = getByRole('button', { name: /ordenar/i });
  expect(buttonFilter).toBeInTheDocument();
  expect(buttonSearch).toBeInTheDocument();
  expect(buttonOrdenate).toBeInTheDocument();
  });    