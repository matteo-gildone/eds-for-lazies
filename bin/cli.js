#!/usr/bin/env node
import {initializeProject} from '../src/init.js';

initializeProject().catch(console.error);