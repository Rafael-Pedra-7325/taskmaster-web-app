from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models, schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="TaskMaster API")

# Habilita suporte a chamadas de origens cruzadas (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/tasks", response_model=List[schemas.TaskResponse])
def read_tasks(db: Session = Depends(get_db)):
    return db.query(models.TaskModel).all()

@app.post("/api/tasks", response_model=schemas.TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = models.TaskModel(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.put("/api/tasks/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, updated_task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = db.query(models.TaskModel).filter(models.TaskModel.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    for key, value in updated_task.model_dump().items():
        setattr(db_task, key, value)
        
    db.commit()
    db.refresh(db_task)
    return db_task

@app.delete("/api/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(models.TaskModel).filter(models.TaskModel.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    db.delete(db_task)
    db.commit()
    return None
