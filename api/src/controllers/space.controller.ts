import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { nanoid } from 'nanoid';
import { ApiError, CustomError } from '../errors';
import { ParticipantModel, SpaceModel, UserDocument, SpaceDocument } from '../models';
import {
  CreateParticipantInput,
  CreateSpaceInput,
  DeleteParticipantInput,
  LoadSpaceInput,
  UpdateParticipantInput,
  UpdateSpaceInput,
} from '../schema';
import { t } from '../utils';

export async function load(req: Request<LoadSpaceInput>, res: Response, next: NextFunction) {
  const { key } = req.params;
  const space = await SpaceModel.findOne({ key });
  res.locals.space = space;
  return next();
}

export async function mySpaces(req: Request, res: Response) {
  const user = req.user as UserDocument;
  const spaces = await SpaceModel.find({ ownerId: user.id });
  return res.json({ spaces });
}

export async function get(req, res) {
  res.json(res.locals.space);
}

export async function create(req: Request<CreateSpaceInput>, res: Response) {
  const ownerId = (req.user as UserDocument).id;
  const key = nanoid(20);
  const space = await SpaceModel.create({ ...req.body, ownerId, key });
  res.status(httpStatus.CREATED).json({ message: t('create_space_success'), space: space.toJSON() });
}

export async function update(req: Request<UpdateSpaceInput>, res: Response) {
  const space = Object.assign(res.locals.space, req.body);
  const savedSpace = await space.save();
  res.status(httpStatus.OK);
  res.json(savedSpace);
}

export async function remove(req: Request, res: Response) {
  const space = res.locals.space as SpaceDocument;
  await space.remove();
  return res.status(httpStatus.OK).send({ message: t('delete_success') });
}

export async function createParticipant(req: Request<CreateParticipantInput>, res: Response) {
  const space = res.locals.space;
  const input = { ...req.body };
  const participant = await ParticipantModel.create(input);
  await space.participants.push(participant.id);
  return res.json({ participants: [], message: '' });
}

export async function updateParticipant(
  req: Request<UpdateParticipantInput['params'], Omit<UpdateParticipantInput['body'], 'userId'>>,
  res: Response,
  next: NextFunction,
) {
  const space = res.locals.space as SpaceDocument;
  const { pid } = req.params;
  let participant = await ParticipantModel.findById(pid);

  if (!participant) {
    return next(ApiError.notFound(t('not_found')));
  }

  if (!space.participantIds.includes(pid)) {
    return next(ApiError.notFound(t('not_found')));
  }

  const input = req.body;
  participant = await participant.update({ type: input.type });
  return res.json({ participant: participant.toJSON() });
}

export async function removeParticipant(req: Request<DeleteParticipantInput>, res: Response) {
  const space = res.locals.space as SpaceDocument;
  const { pid } = req.params;
  space.participantIds = space.participantIds.filter(id => id !== pid);
  return res.sendStatus(httpStatus.OK);
}
