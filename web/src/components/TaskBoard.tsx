import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';
import { getActiveTasks, completeTask, initializeTasks, createTask } from '@/modules/taskManager';
import Task from '@/model/Task';

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [persona, setPersona] = useState('');
  const [group, setGroup] = useState<number>(1);

  useEffect(() => {
    initializeTasks();
    setTasks(getActiveTasks());
  }, []);

  const handleCompleteTask = (taskTitle: string) => {
    completeTask(taskTitle);
    setTasks(getActiveTasks());
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    createTask(title, description, persona, group);
    setTasks(getActiveTasks());
    setTitle('');
    setDescription('');
    setPersona('');
    setGroup(1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Active Tasks
      </Typography>
      <Grid container spacing={4}>
        {tasks.map(task => (
          <Grid item key={task.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {task.title}
                </Typography>
                <Typography variant="body2">
                  {task.description}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => handleCompleteTask(task.title)}>
                  Complete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box component="form" onSubmit={handleAddTask} sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Add New Task
        </Typography>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Persona"
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Group"
          type="number"
          value={group}
          onChange={(e) => setGroup(Number(e.target.value))}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>
          Add Task
        </Button>
      </Box>
    </div>
  );
};

export default TaskBoard;
