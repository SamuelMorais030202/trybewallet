import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testando a página de login', () => {
  const emailUser = 'email-input';
  const passwordUser = 'password-input';

  it('Testando a rota /', () => {
    renderWithRouterAndRedux(<App />);

    // Testando se a o componente Login é renderizado na rota '/'
    const title = screen.getByText(/Trybe Wallet/i);
    expect(title).toBeInTheDocument();
  });

  it('Testando se é renderizado um campo de input e senha', () => {
    renderWithRouterAndRedux(<App />);

    // Verificando se o campo de email está presente na página
    const email = screen.getByTestId(emailUser);
    expect(email).toBeInTheDocument();

    // Verificando se o campo de senha está presente na página
    const password = screen.getByTestId(passwordUser);
    expect(password).toBeInTheDocument();
  });

  it('Testando se é renderizado um botão com o texto Entrar', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', { name: /Entrar/i });
    expect(button).toBeInTheDocument();
  });

  it('Testando a store da aplicação', () => {
    const { store } = renderWithRouterAndRedux(<App />);

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

    // verificando se os valores são correspondentes
    expect(email.value).toBe(EMAIL_USER);
    expect(password.value).toBe(PASSWORD_USER);

    // Simulando o evento do click no botão
    userEvent.click(button);

    // Verificando a store apos o login
    expect(store.getState().user.email).toBe(EMAIL_USER);
  });

  it('Testando se a rota muda ao clicar no botão', () => {
    renderWithRouterAndRedux(<App />);

    // Simulando email e senha do usuário
    const EMAIL_USER = 'email@email.com';
    const PASSWORD_USER = 'userpassord123';

    // Capturando o botão
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    // Capturando o campo de email
    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();

    // Capturando o campo de senha
    const password = screen.getByTestId('password-input');
    expect(password).toBeInTheDocument();

    // Simulando a digitalização do email e senha
    userEvent.type(email, EMAIL_USER);
    userEvent.type(password, PASSWORD_USER);

    // verificando se os valores são correspondentes
    expect(email.value).toBe(EMAIL_USER);
    expect(password.value).toBe(PASSWORD_USER);

    // Simulando o evento do click no botão
    userEvent.click(button);

    // Verfifando se fomos renderizados para a página correta
    const title = screen.getByText(/Header wallet/i);
    expect(title).toBeInTheDocument();
  });
});
