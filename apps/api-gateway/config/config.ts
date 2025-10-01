export const config = {
  rabbitmqUrl: process.env.RABBITMQ_URL || '',
  roomQueueName: process.env.ROOM_QUEUE_NAME || 'rooms_queue',
};
