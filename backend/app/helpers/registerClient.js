class ClientRegistry {
    clients = {};

    async register(user_id, res) {

        if (user_id) {

            if (!this.clients[user_id]) {
                //Store new client
                this.clients[user_id] = res;

                res.setHeader("Content-Type", "text/event-stream");

                res.socket.on('end', () => {
                    delete this.clients[user_id];

                    console.info(`Unregistered: ${user_id}`);

                    res.end();
                });

                //
                console.info(`Registered: ${user_id}`);
            }

            return user_id;
        }

        return null;
    }
}

module.exports = new ClientRegistry();