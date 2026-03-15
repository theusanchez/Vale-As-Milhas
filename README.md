# 💳 Vale as Milhas?

> Calculadora inteligente para comparar compras em programas de milhas e descobrir qual opção oferece o melhor custo-benefício.

## 🎯 Sobre o Projeto

**Vale as Milhas?** é uma ferramenta que ajuda você a decidir se vale a pena comprar produtos através de sites parceiros de programas de pontos/milhas (como Livelo, Esfera, etc.) comparando o valor final após o desconto das milhas geradas.

### 💡 Como Funciona

1. **Adicione seções**: Compare diferentes lojas e sites parceiros
2. **Configure os parâmetros**: 
   - Valor do produto (em R$ ou US$)
   - Pontos ganhos por real/dólar gasto
   - Bônus da companhia aérea (%)
   - Preço de venda de 1.000 milhas
3. **Veja o resultado**: O sistema calcula automaticamente qual opção é mais vantajosa

### ✨ Funcionalidades

- ✅ Comparação lado a lado de múltiplas opções de compra
- 💱 Conversão automática de moedas (Real/Dólar) em tempo real
- 📊 Cálculo de pontos brutos e pontos com bônus
- 💰 Estimativa de valor real das milhas geradas
- 🏆 Identificação automática da melhor opção
- 🌙 Interface moderna e intuitiva
- ⚡ Atualização em tempo real dos cálculos

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://react.dev/)** - Framework JavaScript
- **[Vite 8](https://vitejs.dev/)** - Build tool e dev server
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Estilização
- **[DaisyUI](https://daisyui.com/)** - Componentes UI
- **[AwesomeAPI](https://docs.awesomeapi.com.br/)** - Cotação de moedas em tempo real
- **[React Icons](https://react-icons.github.io/react-icons/)** - Biblioteca de ícones
- **[clsx](https://github.com/lukeed/clsx)** - Utilitário para classes condicionais

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- pnpm (ou npm/yarn)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/vale-as-milhas.git

# Entre na pasta
cd vale-as-milhas

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env e adicione sua chave da AwesomeAPI (opcional)

# Inicie o servidor de desenvolvimento
pnpm dev