import websockets
import asyncio

async def send(websocket, path):
    data = await websocket.recv()
    print("Counter sent " + data)

    reply = "Confirming recieved data was " + data
    await websocket.send(reply)

start_server = websockets.serve(send, "localhost", 8700)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()