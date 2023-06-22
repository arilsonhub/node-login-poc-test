#------> CONFIG STAGE
FROM node:18-alpine3.15

##################### ARGS ################################
ARG USER=node
ARG HOME=/home/$USER

##################### USER HOME ###########################
WORKDIR $HOME/app

##################### COPY FILES ##########################
COPY --chown=$USER:$USER . .

##################### ENVIRONMENT #########################
ENV NPM_CONFIG_PREFIX=$HOME/.npm-global
ENV PATH=$PATH:$HOME/.npm-global/bin
RUN mkdir -p $HOME/.npm-global

##################### ENTRYPOINT ##########################
COPY ./entrypoint.sh /usr/local/bin

USER $USER

ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]
