document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("colaboradores-container");

    if (!container) return;

    container.innerHTML = "";

    const colaboradores = [
        {
            nome: "Leo Fernandes",
            email: "lfernands@newsolutions.com",
            cargo: "Analista de Infraestrutura",
            atividades: [
                "Especialista de tratamento de dados",
                "Especialista em atualizações de software",
                "Especialista em logs",
                "Especialista em recuperação do ambiente"
            ]
        },
        {
            nome: "João Silva",
            email: "jsilva@newsolutions.com",
            cargo: "Analista de BI",
            atividades: [
                "Criação de dashboards",
                "Integração de fontes de dados",
                "Otimização de relatórios empresariais"
            ]
        },
        {
            nome: "Renan Oliveira",
            email: "renan@newsolutions.com",
            cargo: "Desenvolvedor Full Stack",
            atividades: [
                "Desenvolvimento de aplicações web",
                "Integração com APIs",
                "Manutenção de sistemas legados"
            ]
        },
        {
            nome: "Pedro Santos",
            email: "pedro@newsolutions.com",
            cargo: "Suporte Técnico",
            atividades: [
                "Atendimento ao cliente",
                "Resolução de problemas técnicos",
                "Configuração de dispositivos e redes"
            ]
        }
    ];

    const style = document.createElement("style");
    style.innerHTML = `
        .popup-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .popup-content {
            position: relative;
            background: #2e2e2e;
            padding: 30px;
            border-radius: 12px;
            width: 400px;
            box-shadow: 0 0 20px rgba(0,0,0,0.5);
            color: white;
            text-align: center;
        }

        .popup-content textarea {
            width: 100%;
            height: 100px;
            margin-top: 10px;
            background: #444;
            border: none;
            color: white;
            padding: 10px;
            border-radius: 5px;
        }

        .popup-content button {
            margin-top: 15px;
            padding: 10px 20px;
            background-color: #6A0DAD;
            border: none;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }

        .popup-content button:hover {
            background-color: #550a98;
        }

        .close-popup {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 20px;
            color: #aaa;
            cursor: pointer;
        }

        .close-popup:hover {
            color: white;
        }

        .input-busca-moderno {
            padding: 12px 16px;
            font-size: 16px;
            border-radius: 8px;
            border: 1px solid #6A0DAD;
            width: 100%;
            margin-bottom: 20px;
            background-color: #2e2e2e;
            color: white;
        }
    `;
    document.head.appendChild(style);

    const inputBusca = document.createElement("input");
    inputBusca.type = "text";
    inputBusca.placeholder = "Buscar colaborador...";
    inputBusca.className = "input-busca-moderno";
    container.appendChild(inputBusca);

    const cardsContainer = document.createElement("div");
    container.appendChild(cardsContainer);

    function abrirPopupMensagem(colab) {
        const overlay = document.createElement("div");
        overlay.className = "popup-overlay";

        const popup = document.createElement("div");
        popup.className = "popup-content";
        popup.innerHTML = `
            <span class="close-popup" title="Fechar">✖</span>
            <h3>Nova mensagem para ${colab.nome}</h3>
            <p><strong>Para:</strong> ${colab.email}</p>
            <textarea placeholder="Digite sua mensagem aqui..."></textarea>
            <button>Enviar mensagem</button>
        `;

        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        const textarea = popup.querySelector("textarea");
        const enviarBtn = popup.querySelector("button");

        enviarBtn.addEventListener("click", () => {
            const mensagem = textarea.value.trim();
            if (mensagem === "") {
                alert("Por favor, escreva uma mensagem antes de enviar.");
                return;
            }
            document.body.removeChild(overlay);
            mostrarPopupConfirmacao();
        });

        popup.querySelector(".close-popup").addEventListener("click", () => {
            document.body.removeChild(overlay);
        });
    }

    function mostrarPopupConfirmacao() {
        const overlay = document.createElement("div");
        overlay.className = "popup-overlay";

        const popup = document.createElement("div");
        popup.className = "popup-content";
        popup.innerHTML = `
            <span class="close-popup" title="Fechar">✖</span>
            <h3>Mensagem enviada com sucesso!</h3>
            <p>Ela será avaliada pela equipe responsável.</p>
            <p>Aguarde o retorno em breve.</p>
            <button>Fechar</button>
        `;

        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        popup.querySelector("button").addEventListener("click", () => {
            document.body.removeChild(overlay);
        });

        popup.querySelector(".close-popup").addEventListener("click", () => {
            document.body.removeChild(overlay);
        });
    }

    function renderizarColaboradores(lista) {
        cardsContainer.innerHTML = "";
        lista.forEach(colab => {
            const card = document.createElement("div");
            card.className = "colaborador";

            card.innerHTML = `
                <h3>${colab.nome}</h3>
                <p><strong>Cargo:</strong> ${colab.cargo}</p>
                <p><strong>Email:</strong> ${colab.email}</p>
                <p><strong>Atividades:</strong></p>
                <ul>
                    ${colab.atividades.map(a => `<li>${a}</li>`).join('')}
                </ul>
                <button class="btn-msg">Escrever Mensagem</button>
            `;

            card.querySelector(".btn-msg").addEventListener("click", () => {
                abrirPopupMensagem(colab);
            });

            cardsContainer.appendChild(card);
        });
    }

    renderizarColaboradores(colaboradores);

    inputBusca.addEventListener("input", function () {
        const filtro = this.value.toLowerCase();
        const filtrados = colaboradores.filter(c =>
            c.nome.toLowerCase().includes(filtro) ||
            c.cargo.toLowerCase().includes(filtro) ||
            c.email.toLowerCase().includes(filtro)
        );
        renderizarColaboradores(filtrados);
    });
});
