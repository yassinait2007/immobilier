export const getSocket = (channel: string, event: string) => {
  return {
    connect: (listener: any) => {
      console.log(`Mock socket connected to channel ${channel} for event ${event}`);
    },
    dispose: () => {
      console.log(`Mock socket disposed`);
    }
  };
};
