import { response } from "express";
import { PlayerModel } from "../models/playres-model";
import * as PlayerRepository from "../repositories/players-repository";
import * as HttpResponse from "../utils/http-helper";
import { StatisticsModel } from "../models/statistics-model";

export const getPlayerService = async () => {    
    const data = await PlayerRepository.findAllPlayers();
    let response = null;

    if(data) {
        response =  await HttpResponse.ok(data);
    }else {
        response = await HttpResponse.noContent();
    };
   
    return response;
};

export const getPlayerByIdService = async (id: number) => {
    //Pedir para o repositorio de dados
    const data = await PlayerRepository.findPlayerById(id);
    let response = null;

    if(data) {
        response = HttpResponse.ok(data);
    } else {
        response = HttpResponse.noContent();
    };
    
    return response;
};

export const createPlayerService = async (player:PlayerModel ) => {
    let response = null;

    //Verifica se está vazio
    if(Object.keys(player).length != 0) {
        await PlayerRepository.insertPlayer(player);
        response = HttpResponse.created();
        
    }else {
        response = HttpResponse.badRequest();
    }

    return response;
};

export const deletePlayerService = async (id: number) => {
    let response =  null;
    await PlayerRepository.deleteOnePlayer(id);
    response = HttpResponse.ok({message: "Deleted"});
    return response;
};

export const updatePlayerService = async (id:number, statistics:StatisticsModel) => {
    
}