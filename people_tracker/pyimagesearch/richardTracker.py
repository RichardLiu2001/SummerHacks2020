
def get_centroid(bbox):
    return ((bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2)


class richardTrackableObject:
    def __init__(self, bbox, tracker, id):
        centroid = get_centroid(bbox)
        self.centroid = centroid # 2-Tuple, (x,y) for centroid
        self.tracker = tracker # OPENCV TRACKER
        self.id = id
        self.needToDelete = False
        self.directions = [False, False, False, False] # NESW
        self.bbox = bbox
        self.previous = centroid

    def update(self, rgb):
        (success, box) = self.tracker.update(rgb)
        (x, y, w, h) = [int(v) for v in box]

        self.bbox = (x, y, x + w, y + h)
        self.previous = self.centroid
        self.centroid = ((x + x + w) / 2, (y + y + h) / 2)
        self.update_directions()

    def close(self):
        del self.tracker

    def get_id(self):
        return self.id

    def get_centroid(self):
        return self.centroid

    def get_tracker(self):
        return self.tracker

    def update_to_delete(self):
        self.needToDelete = True

    def get_need_to_delete(self):
        return self.needToDelete

    def update_directions(self):
        self.directions[0] = self.is_moving_up()
        self.directions[1] = self.is_moving_right()
        self.directions[2] = self.is_moving_down()
        self.directions[3] = self.is_moving_left()

    def is_moving_up(self):
        return self.centroid[1] - self.previous[1] < 0

    def is_moving_down(self):
        return self.centroid[1] - self.previous[1] > 0

    def is_moving_right(self):
        return self.centroid[0] - self.previous[0] > 0

    def is_moving_left(self):
        return self.centroid[0] - self.previous[0] < 0

    def get_directions(self):
        return self.directions

    def get_bbox(self):
        return self.bbox

