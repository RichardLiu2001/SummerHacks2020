import websockets
import asyncio
import queue

lastFiveNums = []


def addtolist(data):
    if len(lastFiveNums) >= 5:
        lastFiveNums.pop(0)
    lastFiveNums.append(data)
    print(lastFiveNums)


async def send(websocket, path):
    data = await websocket.recv()
    print("Counter sent " + data)
    addtolist(data)

    reply = data
    await websocket.send(reply)


async def displaydata(websocket, path):
    while True:
        if len(lastFiveNums) > 0:
            tosend = lastFiveNums[len(lastFiveNums) - 1]
            await websocket.send(tosend)
            await asyncio.sleep(5)


start_server = websockets.serve(send, "127.0.0.1", 8700)
start_webpage = websockets.serve(displaydata, "127.0.0.1", 8701)
print("Starting the server")
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_until_complete(start_webpage)
asyncio.get_event_loop().run_forever()
