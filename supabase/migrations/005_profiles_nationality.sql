-- Add nationality to profiles; CPF and other national IDs collected later at contract signing
alter table profiles add column if not exists nationality text;
alter table profiles alter column cpf drop not null;
