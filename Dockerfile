#Grab the latest alpine image
FROM ghcr.io/processone/ejabberd
USER root

# install required packages
RUN apk add --no-cache --update bash nodejs npm

COPY nodejs /opt/ejabberd/nodejs

ADD ejabberd.yml /opt/ejabberd/conf/ejabberd.yml
ADD ejabberd.yml /opt/ejabberd-22.05-3-g3449621cc/conf/ejabberd.yml

COPY start.sh /start.sh
RUN chmod +x /start.sh

ENTRYPOINT ["/start.sh"]
#CMD ["foreground"]
