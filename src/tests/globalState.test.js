import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';
// import Wallet from '../pages/Wallet';

describe('Testando o estado global da aplicação', () => {
  const emailUser = 'email-input';
  const passwordUser = 'password-input';

  it('É renderizado um botão de adicionar despesa', async () => {
    renderWithRouterAndRedux(<App />);

    // Simulando email e senha do usuário
    const EMAIL_USER = 'email@email.com';
    const PASSWORD_USER = 'userpassord123';

    // Capturando o botão
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    // Capturando o campo de email
    const email = screen.getByTestId(emailUser);
    expect(email).toBeInTheDocument();

    // Capturando o campo de senha
    const password = screen.getByTestId(passwordUser);
    expect(password).toBeInTheDocument();

    // Simulando o preenchimanto dos campos
    userEvent.type(email, EMAIL_USER);
    userEvent.type(password, PASSWORD_USER);

    userEvent.click(button);

    // Verificando se o botão de adicionar despesa está sendo renderizado
    const buttonAddExpense = screen.getByRole('button');
    expect(buttonAddExpense).toBeInTheDocument();
    expect(buttonAddExpense).toHaveTextContent(/Adicionar despesa/i);
  });

  it('Testando se o estado global é atualizado corretamente', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockData,
    });

    renderWithRouterAndRedux(<App />);
    const EMAIL_USER = 'email@email.com';
    const PASSWORD_USER = 'userpassord123';
    const valueNumber = 100;
    const descriptionExpense = 'salário';

    // Capturando o botão
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    // Capturando o campo de email
    const email = screen.getByTestId(emailUser);
    expect(email).toBeInTheDocument();

    // Capturando o campo de senha
    const password = screen.getByTestId(passwordUser);
    expect(password).toBeInTheDocument();

    // Simulando o preenchimanto dos campos
    userEvent.type(email, EMAIL_USER);
    userEvent.type(password, PASSWORD_USER);

    await act(() => userEvent.click(button));
    // Só falta capturar os elementos do formulário, simular e testar o estado global

    // Acessando, simulando e testando o imput de adicionar o valor
    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeInTheDocument();
    userEvent.type(valueInput, valueNumber);

    // Acessando, simulando e testando o imput de descrição da despesa
    const description = screen.getByTestId('description-input');
    expect(description).toBeInTheDocument();
    userEvent.type(description, descriptionExpense);

    // Acessando, simulando e testando o select das moedas
    const currency = screen.getByTestId('currency-input');
    expect(currency).toBeInTheDocument();
    // const test = userEvent.selectOptions(currency, ['USD']);
    // expect(test).toHaveTextContent('USD');
  });
});
