export const About = () => {
    return (<div className='max-w-3xl'>
        <h2 className="scroll-m-20  pb-2 text-3xl font-semibold first:mt-0 mb-10">
            Sobre
        </h2>

        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Butterworth
        </h3>
        <p className="leading-7 not-first:mt-6 align-middle">
            O filtro Butterworth apresenta uma transição mais suave entre as faixas de frequência permitidas e rejeitadas, reduzindo efeitos de ringing e artefatos indesejáveis decorrentes da filtragem ideal. Sua flexibilidade permite ajustar a ordem do filtro, proporcionando melhor controle sobre o grau de suavização. </p>

        <h3>
            Ideal
        </h3>

        <p className="leading-7 not-first:mt-6">
            O filtro ideal caracteriza-se por uma transição abrupta entre as frequências permitidas e bloqueadas. Seu funcionamento baseia-se na definição de um limiar (cutoff) que preserva apenas as componentes de baixa frequência, eliminando altas frequências responsáveis por ruídos e detalhes finos.
        </p>

        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            gaussiano
        </h3>

        <p className="leading-7 not-first:mt-6">
            O filtro gaussiano utiliza uma curva de distribuição normal como função de transferência, oferecendo suavização uniforme e evitando descontinuidades abruptas. Sua aplicação é amplamente reconhecida por minimizar ruídos preservando a naturalidade da imagem.
        </p>
    </div>
    )
}
