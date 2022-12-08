const express = require('express');
const { activities } = require('./in-memory-db');

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
    res.status(200).json(activities);
});

app.get('/:id', (req, res) => {
    const { id } = req.params;

    const activity = activities.find(
        (activityItem) => activityItem.id === Number(id),
    );

    if (!activity) {
        return res.status(404).json({
            error: 'Not found',
        });
    }

    res.status(200).json(activity);
});

app.post('/', (req, res) => {
    activities.push(req.body);
    res.status(200).json(activities);
});

app.put('/:id', (req, res) => {
    const { id } = req.params;
    const { description, status } = req.body;

    const activity = activities.find(
        (activityItem) => activityItem.id === Number(id),
    );

    activity.description = description;
    activity.status = status;

    return res.status(200).json(activities);
});

app.delete('/:id', (req, res) => {
    const { id } = req.params;

    const activityIndex = activities.findIndex(
        (activityItem) => activityItem.id === Number(id),
    );

    activities.splice(activityIndex, 1);

    res.status(200).json({
        message: `Atividade com id: ${id} foi deletada com sucesso!`,
        activities,
    });
});

module.exports = {
    app,
};