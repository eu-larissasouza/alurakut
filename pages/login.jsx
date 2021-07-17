import React from 'react';
// Hook do NextJS
import { useRouter } from 'next/router';
import nookies from 'nookies';

export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUser] = React.useState('eu-larissasouza');

  return (
    <main
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://raw.githubusercontent.com/eu-larissasouza/alurakut/main/img/elements/logo.svg" />

          <p>
            <strong>Conecte-se</strong> a seus amigos e a outros devs que assim
            como você tem a paixão por codar
          </p>
          <p>
            <strong>Conheça</strong> outros devs e compartilhe soluções, troque
            ideias e fique por dentro das tendências da área de TI.
          </p>
          <p>
            <strong>Compartilhe</strong> seus repositórios, projetos e
            inspirações, tudo em um só lugar
          </p>
        </section>

        <section className="formArea">
          <form
            className="box"
            onSubmit={(infosDoEvento) => {
              infosDoEvento.preventDefault();
              // alert('Alguém clicou no botão!')
              console.log('Usuário Github: ', githubUser);
              fetch('https://alurakut.vercel.app/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ githubUser: githubUser }),
              }).then(async (serverResponse) => {
                const responseDados = await serverResponse.json();
                const token = responseDados.token;
                nookies.set(null, 'USER_TOKEN', token, {
                  path: '/',
                  maxAge: 86400 * 7,
                });
                router.push('/');
              });
            }}
          >
            <p>
              Acesse agora mesmo com seu<br></br>
              usuário do <strong>GitHub</strong>!
            </p>
            <input
              placeholder="Usuário"
              value={githubUser}
              onChange={(e) => {
                setGithubUser(e.target.value);
              }}
            />
            {githubUser.length === 0 ? 'Informe seu usuário' : ''}
            <button type="submit">Entrar com o Github</button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>ENTRAR JÁ</strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            <a href="https://github.com/eu-larissasouza">
              © 2021 Desenvolvido por Larissa Souza
            </a>{' '}
            - <a href="/">Sobre o DevKut.br</a> -{' '}
            <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> -{' '}
            <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
