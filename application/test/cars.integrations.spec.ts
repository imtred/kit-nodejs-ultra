import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import {MockCarRepository} from "../../infrastructure/src/MockCarRepository";
import {CarModule} from "../src/car/car.module";

describe("CarController (integration)", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                CarModule
            ],
            providers: [
                {
                    provide: "ICarRepository",
                    useValue: new MockCarRepository()
                }
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("/cars (GET)", () => {
        return request(app.getHttpServer())
            .get("/cars")
            .expect(200)
            .expect([]);
    });
});
