from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class TaskModel(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    status = Column(String, default="Pendente")  # Pendente, Em Andamento, Concluído
    priority = Column(String, default="Média")     # Baixa, Média, Alta
