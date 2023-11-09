import concurrent.futures

from src.handleSystemStream import obtain_frames

IPs = [
    "172.20.14.97",
    "172.20.14.128",
    "172.20.14.89",
    "172.20.14.47",
    "172.20.14.197",
    "172.20.14.198",
    "172.20.14.140",
    "172.20.14.58",
]


def start(debug: bool):
    path = "../../img/"
    with concurrent.futures.ThreadPoolExecutor() as executor:
        args: (str, str, bool) = [(
            ip,
            f'{path}out/stream/{ip}/%d.jpg',
            debug
        ) for ip in IPs]

        results = [executor.submit(obtain_frames, *arg) for arg in args]
        concurrent.futures.wait(results)


if __name__ == "__main__":
    start(False)
