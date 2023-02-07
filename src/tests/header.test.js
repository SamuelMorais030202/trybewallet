import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testando o componente Header', () => {
  const emailUser = 'email-input';
  const passwordUser = 'password-input';

  it('Testando se o email do usuario é renderizado no header', () => {
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

    // Testando se o email do usuário está sendo renderizado
    const userEmail = screen.getByTestId('email-field');
    expect(userEmail).toBeInTheDocument();
    expect(userEmail).toHaveTextContent(EMAIL_USER);

    // Testando se a soma é inicialmente zero
    const sumCurrency = screen.getByTestId('total-field');
    expect(sumCurrency).toBeInTheDocument();
    expect(sumCurrency).toHaveTextContent('0');

    // Testando se é renderizado o testo BRL
    const currency = screen.getByTestId('header-currency-field');
    expect(currency).toBeInTheDocument();
    expect(currency).toHaveTextContent('BRL');
  });
});
