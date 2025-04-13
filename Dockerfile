# Imagem base
FROM node:20

# Diretório de trabalho no container
WORKDIR /app

# Copia apenas os arquivos de dependências para instalar mais rápido
COPY package.json yarn.lock ./

# Instala as dependências
RUN yarn install

# Copia o restante do projeto
COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# Comando para iniciar o ambiente de desenvolvimento
CMD ["yarn", "dev", "--host"]
