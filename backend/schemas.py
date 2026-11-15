from pydantic import BaseModel, ConfigDict, Field, field_validator
from typing import Optional, Literal

StatusType = Literal["Pendente", "Em Andamento", "Concluído"]
PriorityType = Literal["Baixa", "Média", "Alta"]

class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=150)
    description: Optional[str] = None
    status: StatusType = "Pendente"
    priority: PriorityType = "Média"

    @field_validator("title")
    @classmethod
    def title_must_not_be_blank(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("O título da tarefa não pode ficar em branco.")
        return cleaned

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=150)
    description: Optional[str] = None
    status: Optional[StatusType] = None
    priority: Optional[PriorityType] = None

    @field_validator("title")
    @classmethod
    def title_must_not_be_blank(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("O título da tarefa não pode ficar em branco.")
        return cleaned

class TaskResponse(TaskBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
