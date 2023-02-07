import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('Testando o formulário de adicionar as despesas', () => {
  const emailUser = 'email-input';
  const passwordUser = 'password-input';

  it('Testando se os elementos do formulário são renderizados corretamente', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockData,
    });

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

    await act(() => userEvent.click(button));

    // Testando o input de adicionar a despesa
    const valueExpense = screen.getByTestId('value-input');
    expect(valueExpense).toBeInTheDocument();

    // Testando o input de adicionar a descrição da despesa
    const descriptionExpense = screen.getByTestId('description-input');
    expect(descriptionExpense).toBeInTheDocument();

    // Testando o input de selecionar a moeda da despesa
    const currency = screen.getByTestId('currency-input');
    expect(currency).toBeInTheDocument();
    expect(currency).toHaveTextContent(/USDCADEURGBPARSBTCLTCJPYCHFAUDCNYILSETHXRPDOGE/i);

    // Testando o input de selecionar o método de pagamento
    const method = screen.getByTestId('method-input');
    expect(method).toBeInTheDocument();
    expect(method).toHaveTextContent('Dinheiro', 'Cartão de créditoe', 'Cartão de débito');

    // Testando o campo de categoria da despesa
    const tag = screen.getByTestId('tag-input');
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveTextContent('Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde');
  });
});
