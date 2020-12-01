module.exports = {
  name: "pause",
  run: async (client, message, args) => {
    const serverQueue = client.queue.get(message.guild.id);
    const { channel } = message.member.voice;
    try {
      if (!channel)
        return message.channel.send(
          "I'm sorry but you need to be in a voice channel to pause music!"
        );
      if (message.guild.me.voice.channel !== message.member.voice.channel) {
        return message.channel.send(
          "YOU HAVE TO BE IN SAME VOICE CHANNEL IF YOU WANT PAUSE MUSIC"
        );
      }
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause(true);
        return message.channel.send({
          embed: {
            color: "BLUE",
            description: "**⏸ PAUSED**"
          }
        });
      }
      return message.channel.send("**There is Nothing Playing!**");
    } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
    }
  }
};
