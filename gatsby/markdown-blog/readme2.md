GATSBY

para instalar -> npm install --global gatsby gatsby-cli
para ver que quedo instalado -> gatsby -v
ya hay un site en github configurado para iniciar -> https://github.com/gatsbyjs/gatsby-starter-hello-world

entonces para crear un site con este ejemplo tecleamos
-> gatsby new nombresite https://github.com/gatsbyjs/gatsby-starter-hello-world

para correr el site
-> gatsby develop

Gatsby usa plugins para crear sitios, el sitio incial que vamos a crear va a ser un blog
alimentado por archivos markdown alimentados localmente, instalamos dos plugins
-> npm install --save gatsby-source-filesystem -> para leer archivos localmente
-> npm install --save gatsby-transformer-remark -> para parsear archivos markdown usando remark

Luego de esto creamos un archivo de configuración para los pluguins
-> touch gatsby-config.js
Creamos carpeta con fecha y adentro creamos archivos.md para el blog